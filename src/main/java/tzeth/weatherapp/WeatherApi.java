package tzeth.weatherapp;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;

public final class WeatherApi {

	private static final String BASE_URL = "http://api.wunderground.com/api";
	
	private final String key;
	
	public WeatherApi(String key) {
		this.key = key;
	}
	
	public CurrentConditions getCurrentConditions(String region, String city) throws Exception {
		String url = String.format("%s/%s/conditions/q/%s/%s.json", 
				BASE_URL,
				key,
				region.replace("\\s", "_"),
				city.replaceAll("\\s", "_"));
		return get(url, json -> {
			JSONObject currentObs = json.getJSONObject("current_observation");
			String weather = currentObs.getString("weather");
			double tempF = currentObs.getDouble("temp_f");
			String relativeHumidity = currentObs.getString("relative_humidity");
			String windDesc = currentObs.getString("wind_string");
			String windDir = currentObs.getString("wind_dir");
			double windMph = currentObs.getDouble("wind_mph");
			Wind wind = new Wind(windDesc, windDir, windMph);
			return new CurrentConditions(weather, tempF, relativeHumidity, wind);
		});
	}
	
	public Astronomy getAstronomy(String region, String city) throws Exception {
		String url = String.format("%s/%s/astronomy/q/%s/%s.json", 
				BASE_URL,
				key,
				region.replace("\\s", "_"),
				city.replaceAll("\\s", "_"));
		return get(url, json -> {
			JSONObject jsonMoon = json.getJSONObject("moon_phase");
			Moon moon = new Moon(
					jsonMoon.getString("phaseofMoon"),
					jsonMoon.getInt("ageOfMoon"),
					jsonMoon.getInt("percentIlluminated"),
					Time.fromJson(jsonMoon.getJSONObject("moonrise")),
					Time.fromJson(jsonMoon.getJSONObject("moonset")));
			JSONObject jsonSun = json.getJSONObject("sun_phase");
			Sun sun = new Sun(
					Time.fromJson(jsonSun.getJSONObject("sunrise")),
					Time.fromJson(jsonSun.getJSONObject("sunset")));
			return new Astronomy(moon, sun);
		});
	}
	
	private static <T> T get(String url, Deserializer<T> deserializer) throws Exception {
		try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
			HttpGet get = new HttpGet(url);
			try (CloseableHttpResponse response = httpClient.execute(get)) {
				HttpEntity entity = response.getEntity();
				String data = EntityUtils.toString(entity);
				JSONObject jsonO = new JSONObject(data);
				return deserializer.parse(jsonO);
			}
		}
	}
	
	
	@FunctionalInterface
	private static interface Deserializer<T> {
		
		T parse(JSONObject json);
		
	}
	
}
