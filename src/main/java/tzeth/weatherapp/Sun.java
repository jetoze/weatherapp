package tzeth.weatherapp;

public final class Sun {

	private final Time rises;
	
	private final Time sets;

	public Sun(Time rises, Time sets) {
		this.rises = rises;
		this.sets = sets;
	}

	public Time getRises() {
		return rises;
	}

	public Time getSets() {
		return sets;
	}

	@Override
	public String toString() {
		return String.format("Rises: %s. Sets: %s", rises, sets);
	}
	
}
