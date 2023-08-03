package edu.ucsc.cse118.assignment3.ui.channel

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import edu.ucsc.cse118.assignment3.R
import edu.ucsc.cse118.assignment3.data.Channel

class ChannelAdapter(private val channels: ArrayList<Channel>, private val listener: ChannelListener) :
    RecyclerView.Adapter<ChannelAdapter.ChannelViewHolder>()
{
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ChannelViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.card_view_channel, parent, false)
        return ChannelViewHolder(view)
    }

    override fun onBindViewHolder(holder: ChannelViewHolder, position: Int) {
        holder.bind(channels[position])
        holder.itemView.setOnClickListener { listener.onClick(channels[position]) }
    }

    override fun getItemCount(): Int {
        return channels.size
    }

    class ChannelViewHolder(ItemView: View) : RecyclerView.ViewHolder(ItemView) {
        private val titleChannel: TextView = itemView.findViewById(R.id.title_channel)
        private val numMessages : TextView = itemView.findViewById(R.id.num_messages)

        fun bind(channel: Channel) {
            titleChannel.text = channel.name
            numMessages.text = "${channel.messages} Messages"
        }
    }

}