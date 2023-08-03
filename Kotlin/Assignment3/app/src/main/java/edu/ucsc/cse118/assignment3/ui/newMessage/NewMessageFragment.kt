package edu.ucsc.cse118.assignment3.ui.newMessage

import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.navigation.fragment.findNavController
import com.google.android.material.snackbar.Snackbar
import edu.ucsc.cse118.assignment3.databinding.FragmentNewMessageBinding
import edu.ucsc.cse118.assignment3.model.SharedViewModel

/*
Resources: Based my solution on the example login fragment
Adding a SnackBar Message:
https://developer.android.com/reference/com/google/android/material/snackbar/Snackbar
Popping back on the nav stack as to not duplicate fragments on the stack:
https://developer.android.com/guide/navigation/navigation-navigate#back-stack
*/

class NewMessageFragment : Fragment() {

    private lateinit var binding: FragmentNewMessageBinding
    private val sharedViewModel: SharedViewModel by activityViewModels()

    private val textWatcher = object : TextWatcher {
        override fun afterTextChanged(s: Editable?) {}
        override fun beforeTextChanged(s: CharSequence?, start: Int, count: Int, after: Int) {}
        override fun onTextChanged(s: CharSequence?, start: Int, before: Int, count: Int) {
            binding.addButton.isEnabled = s?.length ?: 0 >= 16
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentNewMessageBinding.inflate(inflater, container, false)
        binding.addButton.isEnabled = false
        binding.content.addTextChangedListener(textWatcher)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding.newMessageFragment = this
    }

    fun add() {
        sharedViewModel.addMessage(binding.content.text.toString())
        findNavController().popBackStack()
        // Show a snackbar to confirm message creation
        val snackBar = Snackbar.make(
            requireView(),
            "Message Created",
            Snackbar.LENGTH_SHORT
        )
        snackBar.show()
    }
}
