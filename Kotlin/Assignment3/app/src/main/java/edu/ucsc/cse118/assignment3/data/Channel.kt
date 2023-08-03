package edu.ucsc.cse118.assignment3.data

import kotlinx.serialization.Serializable

@Serializable
data class Channel (
    val id: String,
    val name: String,
    val messages: Int
)