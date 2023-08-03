package edu.ucsc.cse118.assignment3.data

import kotlinx.datetime.Instant
import kotlinx.serialization.Serializable

@Serializable
data class Message (
    val id: String,
    val poster: String, // name of person who posted the message
    val date: Instant,
    val content: String
)