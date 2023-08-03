package edu.ucsc.cse118.assignment3.ui.detail

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import edu.ucsc.cse118.assignment3.databinding.FragmentDetailBinding
import edu.ucsc.cse118.assignment3.model.SharedViewModel
import edu.ucsc.cse118.assignment3.model.ViewModelEvent
import androidx.lifecycle.Observer
import edu.ucsc.cse118.assignment3.data.Message
import edu.ucsc.cse118.assignment3.functions.FormatDate
import java.time.Instant

class DetailFragment : Fragment() {

    private lateinit var binding: FragmentDetailBinding
    private val sharedViewModel: SharedViewModel by activityViewModels()

    private val errorObserver = Observer<ViewModelEvent<String>> { event ->
        var error = event.getUnhandledContent()
        if (error != null) {
            Toast.makeText(context, "Error: $error", Toast.LENGTH_LONG).show()
        }
    }

    private val detailObserver = Observer<ViewModelEvent<Message>> { event ->
        val detail = event.getUnhandledContent()
        if (detail != null) {
            (activity as AppCompatActivity?)!!.supportActionBar!!.title = detail.poster
            binding.date.text = detail.date.toString()
            binding.content.text = detail.content
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        sharedViewModel.error.observe(this, errorObserver)
        sharedViewModel.message.observe(this, detailObserver)
    }

    override fun onDestroy() {
        super.onDestroy()
        sharedViewModel.error.removeObserver(errorObserver)
        sharedViewModel.message.removeObserver(detailObserver)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentDetailBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val theMessage = sharedViewModel.message.value?.getUnhandledContent()
        val instant = Instant.parse(theMessage?.date.toString())
        binding.date.text = FormatDate.formatDate(instant)
        binding.content.text = theMessage?.content
        (activity as AppCompatActivity?)!!.supportActionBar!!.title = theMessage?.poster
    }
}