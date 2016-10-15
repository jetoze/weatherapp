package tzeth.weatherapp;

import static spark.Spark.port;
import static spark.Spark.staticFileLocation;

public final class Bootstrap {

    private static final int PORT = 8080;

	public static void main(String[] args) throws Exception {
		String apiKey = args[0];
		WeatherApi api = new WeatherApi(apiKey);
		port(PORT);
		staticFileLocation("/public");
		new WeatherResource(api);
	}
	
}
