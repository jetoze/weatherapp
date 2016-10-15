package tzeth.weatherapp;

import static spark.Spark.get;

public final class WeatherResource {

	private final WeatherApi api;
	
	public WeatherResource(WeatherApi api) {
		this.api = api;
		setupEndpoints();
	}
	
	private void setupEndpoints() {
		get("/api/v1/conditions/:region/:city", "application/json",
				(request, response) -> api.getCurrentConditions(request.params("region"), request.params("city")),
				new JsonTransformer());
		
		get("/api/v1/astronomy/:region/:city", "application/json",
				(request, response) -> api.getAstronomy(request.params("region"), request.params("city")),
				new JsonTransformer());
	}
	
}
