package tzeth.weatherapp;

public final class Wind {

	private final String description;
	
	private final String direction;
	
	private final double mph;

	public Wind(String description, String direction, double mph) {
		this.description = description;
		this.direction = direction;
		this.mph = mph;
	}

	public String getDescription() {
		return description;
	}

	public String getDirection() {
		return direction;
	}

	public double getMph() {
		return mph;
	}
	
	@Override
	public String toString() {
		return String.format("%s. Direction: %s. Speed (mph): %.1f", description, direction, mph);
	}
	
}
