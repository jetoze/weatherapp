package tzeth.weatherapp;

public final class Moon {
	
	private final String phase;
	
	private final int age;

	private final int percentIlluminated;
	
	private final Time rises;
	
	private final Time sets;

	public Moon(String phase, int age, int percentIlluminated, Time rises, Time sets) {
		this.phase = phase;
		this.age = age;
		this.percentIlluminated = percentIlluminated;
		this.rises = rises;
		this.sets = sets;
	}

	public String getPhase() {
		return phase;
	}

	public int getAge() {
		return age;
	}

	public int getPercentIlluminated() {
		return percentIlluminated;
	}
	
	public Time getRises() {
		return rises;
	}

	public Time getSets() {
		return sets;
	}

	@Override
	public String toString() {
		return String.format("Phase: %s. Age: %d. % illuminated: %d. Rises: %s. Sets: %s",
				phase, age, percentIlluminated, rises, sets);
	}
}
