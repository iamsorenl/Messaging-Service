package edu.ucsc.cse118.assignment3.ui.message

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.recyclerview.widget.RecyclerView
import edu.ucsc.cse118.assignment3.model.SharedViewModel
import edu.ucsc.cse118.assignment3.model.ViewModelEvent
import androidx.lifecycle.Observer
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.ItemTouchHelper
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.android.material.snackbar.Snackbar
import edu.ucsc.cse118.assignment3.R
import edu.ucsc.cse118.assignment3.data.Message
import edu.ucsc.cse118.assignment3.databinding.FragmentMessageBinding

/*
* Resources:
* Adding a FAB and a listener:
* https://developer.android.com/guide/topics/ui/floating-action-button#using-a-floating-action-button
* Swipe to delete based on example on GeeksforGeeks:
* https://www.geeksforgeeks.org/android-swipe-to-delete-and-undo-in-recyclerview-with-kotlin/
* Confirmation Dialog Box based on example on:
* https://www.digitalocean.com/community/tutorials/android-alert-dialog-using-kotlin
* To get the card/card position stored in the recycler
* view to obtain the poster and know which card was deleted:
* https://developer.android.com/reference/kotlin/androidx/recyclerview/widget/RecyclerView.Adapter
* https://developer.android.com/reference/kotlin/androidx/recyclerview/widget/RecyclerView.ViewHolder
*/
class MessageFragment : Fragment(), MessageListener {

    private val sharedViewModel: SharedViewModel by activityViewModels()
    private lateinit var recyclerView: RecyclerView

    private val errorObserver = Observer<ViewModelEvent<String>> { event ->
        val error = event.getUnhandledContent()
        if (error != null) {
            Toast.makeText(context, "Error: $error", Toast.LENGTH_LONG).show()
        }
    }

    private val messagesObserver = Observer<ArrayList<Message>> { messages ->
        recyclerView.adapter = MessageAdapter(messages, this)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        sharedViewModel.error.observe(this, errorObserver)
        sharedViewModel.messages.observe(this, messagesObserver)
    }

    override fun onDestroy() {
        super.onDestroy()
        sharedViewModel.error.removeObserver(errorObserver)
        sharedViewModel.messages.removeObserver(messagesObserver)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val fragmentBinding = FragmentMessageBinding.inflate(inflater, container, false)
        return fragmentBinding.root
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        recyclerView = view.findViewById(R.id.recyclerview)
        recyclerView.layoutManager = LinearLayoutManager(activity)
        recyclerView.adapter = MessageAdapter(arrayListOf(), this)
        sharedViewModel.getMessages() // get list of messages
        (activity as AppCompatActivity?)!!.supportActionBar!!.title = sharedViewModel.channel.value?.getRawContent()?.name
        val fab = view.findViewById<FloatingActionButton>(R.id.fab)
        fab.setOnClickListener {
            findNavController().navigate(R.id.action_messageFragment_to_newMessageFragment)
        }
        ItemTouchHelper(object : ItemTouchHelper.SimpleCallback(0, ItemTouchHelper.RIGHT) {
            override fun onMove(
                recyclerView: RecyclerView,
                viewHolder: RecyclerView.ViewHolder,
                target: RecyclerView.ViewHolder
            ): Boolean {
                return false
            }
            override fun onSwiped(viewHolder: RecyclerView.ViewHolder, direction: Int) {
                val position = viewHolder.adapterPosition
                val message = (recyclerView.adapter as MessageAdapter).getMessageAtPosition(position)
                val poster = message.poster
                val builder = AlertDialog.Builder(context!!)
                builder.setTitle("Delete Message\nFrom $poster?")
                builder.setPositiveButton("YES") { _, _ ->
                    sharedViewModel.deleteMessage(message)
                    recyclerView.adapter?.notifyItemRemoved(position)
                    Snackbar.make(
                        requireView().rootView,
                        "Message Deleted",
                        Snackbar.LENGTH_LONG
                    ).show()
                }
                builder.setNegativeButton("NO") { _, _ ->
                    recyclerView.adapter?.notifyItemChanged(position)
                }
                builder.show()
            }
        }).attachToRecyclerView(recyclerView)
    }

    override fun onClick(message: Message) {
        sharedViewModel.setMessage(message)
        findNavController().navigate(R.id.action_messageFragment_to_detailFragment)
    }
}