package edu.ucsc.cse118.assignment3.ui.channel

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.recyclerview.widget.RecyclerView
import edu.ucsc.cse118.assignment3.model.SharedViewModel
import edu.ucsc.cse118.assignment3.model.ViewModelEvent
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import edu.ucsc.cse118.assignment3.R
import edu.ucsc.cse118.assignment3.data.Channel
import edu.ucsc.cse118.assignment3.databinding.FragmentChannelBinding

class ChannelFragment : Fragment(), ChannelListener {

    private val sharedViewModel: SharedViewModel by activityViewModels()
    private lateinit var recyclerView: RecyclerView

    private val errorObserver = Observer<ViewModelEvent<String>> { event ->
        val error = event.getUnhandledContent()
        if (error != null) {
            Toast.makeText(context, "Error: $error", Toast.LENGTH_LONG).show()
        }
    }

    private val channelsObserver = Observer<ArrayList<Channel>> { channels ->
        recyclerView.adapter = ChannelAdapter(channels, this)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        sharedViewModel.error.observe(this, errorObserver)
        sharedViewModel.channels.observe(this, channelsObserver)
    }

    override fun onDestroy() {
        super.onDestroy()
        sharedViewModel.error.removeObserver(errorObserver)
        sharedViewModel.channels.removeObserver(channelsObserver)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val fragmentBinding = FragmentChannelBinding.inflate(inflater, container, false)
        return fragmentBinding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        recyclerView = view.findViewById(R.id.recyclerview)
        recyclerView.layoutManager = LinearLayoutManager(activity)
        recyclerView.adapter = ChannelAdapter(arrayListOf(), this)
        sharedViewModel.getChannels() // get list of channels
        (activity as AppCompatActivity?)!!.supportActionBar!!.title = sharedViewModel.workspace.value?.getRawContent()?.name
    }

    override fun onClick(channel: Channel) {
        sharedViewModel.setChannel(channel)
        findNavController().navigate(R.id.action_channelFragment_to_messageFragment)
    }
}