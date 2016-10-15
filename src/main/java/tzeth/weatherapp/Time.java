package tzeth.weatherapp;

import org.json.JSONObject;

public final class Time {

	private final int hour;
	
	private final int minute;

	public Time(int hour, int minute) {
		this.hour = hour;
		this.minute = minute;
	}

	public static Time fromJson(JSONObject json) {
		return new Time(json.getInt("hour"), json.getInt("minute"));
	}
	
	public int getHour() {
		return hour;
	}

	public int getMinute() {
		return minute;
	}

	@Override
	public String toString() {
		return hour + ":" + minute;
	}
	
	
}
