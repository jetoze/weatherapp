package tzeth.weatherapp;

public final class Astronomy {

	private final Moon moon;
	
	private final Sun sun;

	public Astronomy(Moon moon, Sun sun) {
		this.moon = moon;
		this.sun = sun;
	}

	public Moon getMoon() {
		return moon;
	}

	public Sun getSun() {
		return sun;
	}

	@Override
	public String toString() {
		return String.format("[Moon: %s] [Sun: %s]", moon, sun);
	}
}
