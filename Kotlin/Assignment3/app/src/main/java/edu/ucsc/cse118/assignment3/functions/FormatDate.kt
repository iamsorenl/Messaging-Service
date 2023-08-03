package edu.ucsc.cse118.assignment3.functions

import java.time.Instant
import java.time.ZoneId
import java.time.ZoneOffset
import java.time.format.DateTimeFormatter
import java.time.format.FormatStyle
import java.util.*

class FormatDate {
    companion object {
        /*
        * formatting date to (Month) (Day), (Year), (Time AM/PM)
        * https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/time/format/DateTimeFormatter.html
        * M: month
        * d: day
        * y: year
        * h: hour (12 hr)
        * m: minute
        * s: second
        * a: AM/PM
        * Pattern is applied to DateTimeFormatter with Locale.US to format
        * the date to the preference of US English as well as ZoneOffset.UTC
        * to ensure the correct time zone
        */
        fun formatDate(instant: Instant): String {
            val formatter = DateTimeFormatter.ofPattern("MMM d, yyyy, h:mm:ss a")
                .withLocale(Locale.US)
                .withZone(ZoneOffset.UTC)
            return formatter.format(instant)
        }
    }
}
