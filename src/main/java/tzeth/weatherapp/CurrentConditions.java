package tzeth.weatherapp;

public final class CurrentConditions {

	private final String weather;
	
	private final double tempF;
	
	private final String relativeHumidity;
	
	private final Wind wind;

	public CurrentConditions(String weather, 
							 double tempF, 
							 String relativeHumidity, 
							 Wind wind) {
		this.weather = weather;
		this.tempF = tempF;
		this.relativeHumidity = relativeHumidity;
		this.wind = wind;
	}

	public final String getWeather() {
		return weather;
	}

	public final double getTempF() {
		return tempF;
	}

	public final String getRelativeHumidity() {
		return relativeHumidity;
	}

	public final Wind getWind() {
		return wind;
	}
	
	@Override
	public String toString() {
		return String.format("%s. Temp (F): %.1f. Rel Humidity: %s. Wind: %s", 
				weather, tempF, relativeHumidity, wind);
	}
	
}
