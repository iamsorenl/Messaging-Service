package edu.ucsc.cse118.assignment3.repo

import edu.ucsc.cse118.assignment3.data.Channel
import edu.ucsc.cse118.assignment3.data.Message
import edu.ucsc.cse118.assignment3.data.Member
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json
import java.net.URL
import javax.net.ssl.HttpsURLConnection

/*
* Resources:
* formatting content for http request:
* https://kotlinlang.org/docs/basic-syntax.html#string-templates
* writing to the outputStream:
* https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/io/OutputStream.html#write(byte%5B%5D)
* (addMessage() based on login implementation from example)
* deleteOne based on getOne style function from ball club, only difference is not
* needing to decode any string, which is also done in addMessage because there is no output
* just a return code
*/

class MessageRepository {

    fun addMessage(member: Member?, channel: Channel?, content: String) {
        val path = "$url/${channel?.id}"
        val requestBody = """{ "content": "$content" }"""
        with(URL(path).openConnection() as HttpsURLConnection) {
            requestMethod = "POST"
            setRequestProperty("Content-Type", "application/json")
            setRequestProperty("Accept", "application/json")
            setRequestProperty("Authorization", "Bearer ${member?.accessToken}")
            outputStream.write(requestBody.toByteArray())
            if (responseCode != HttpsURLConnection.HTTP_CREATED) {
                throw Exception("Failed to POST HTTP $responseCode")
            }
        }
    }

    fun deleteOne(member: Member?, message: Message?) {
        val path = "$url/${message?.id}"
        with(URL(path).openConnection() as HttpsURLConnection) {
            requestMethod = "DELETE"
            setRequestProperty("Content-Type", "text/html; charset=UTF-8n")
            setRequestProperty("Accept", "application/json")
            setRequestProperty("Authorization", "Bearer ${member?.accessToken}")
            if (responseCode != HttpsURLConnection.HTTP_OK) {
                throw Exception("Failed to DELETE HTTP $responseCode")
            }
        }
    }

    companion object {
        private const val url = "https://cse118.com/api/v0/message"
    }
}