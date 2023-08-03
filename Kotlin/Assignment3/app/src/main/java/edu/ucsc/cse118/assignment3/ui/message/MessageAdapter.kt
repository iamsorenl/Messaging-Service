package edu.ucsc.cse118.assignment3.ui.message

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import edu.ucsc.cse118.assignment3.R
import edu.ucsc.cse118.assignment3.data.Message
import edu.ucsc.cse118.assignment3.functions.FormatDate.Companion.formatDate
import java.time.Instant

class MessageAdapter(private val messages: ArrayList<Message>, private val listener: MessageListener) :
    RecyclerView.Adapter<MessageAdapter.MessageViewHolder>()
{
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MessageViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.card_view_message, parent, false)
        return MessageViewHolder(view)
    }

    override fun onBindViewHolder(holder: MessageViewHolder, position: Int) {
        holder.bind(messages[position])
        holder.itemView.setOnClickListener { listener.onClick(messages[position]) }
    }

    override fun getItemCount(): Int {
        return messages.size
    }

    fun getMessageAtPosition(position: Int): Message {
        return messages[position]
    }

    fun addItem(position: Int, message: Message) {
        messages.add(position, message)
    }

    class MessageViewHolder(ItemView: View) : RecyclerView.ViewHolder(ItemView) {
        private val poster: TextView = itemView.findViewById(R.id.poster)
        private val date : TextView = itemView.findViewById(R.id.date)
        private val content : TextView = itemView.findViewById(R.id.content)

        fun bind(message: Message) {
            poster.text = message.poster
            val instant = Instant.parse(message.date.toString())
            date.text = formatDate(instant)
            if(message.content.length > 45)
                content.text = "${message.content.substring(0, 45)}..."
            else
                content.text = message.content
        }
    }

    }