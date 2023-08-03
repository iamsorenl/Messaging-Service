package edu.ucsc.cse118.assignment3.model

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import edu.ucsc.cse118.assignment3.data.Channel
import edu.ucsc.cse118.assignment3.data.Member
import edu.ucsc.cse118.assignment3.data.Message
import edu.ucsc.cse118.assignment3.data.Workspace
import edu.ucsc.cse118.assignment3.repo.ChannelRepository
import edu.ucsc.cse118.assignment3.repo.MemberRepository
import edu.ucsc.cse118.assignment3.repo.MessageRepository
import edu.ucsc.cse118.assignment3.repo.WorkspaceRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

/*
* Resources:
* use of sortedBy to sort messages in order to
* present the newest message first
*/

class SharedViewModel: ViewModel() {
    // workspace
    private val _workspaces = MutableLiveData<ArrayList<Workspace>>()
    val workspaces : LiveData<ArrayList<Workspace>> = _workspaces

    private val _workspace = MutableLiveData<ViewModelEvent<Workspace>>()
    val workspace : LiveData<ViewModelEvent<Workspace>> = _workspace

    // channels
    private val _channels = MutableLiveData<ArrayList<Channel>>()
    val channels : LiveData<ArrayList<Channel>> = _channels

    private val _channel = MutableLiveData<ViewModelEvent<Channel>>()
    val channel : LiveData<ViewModelEvent<Channel>> = _channel

    // messages
    private val _messages = MutableLiveData<ArrayList<Message>>()
    val messages : LiveData<ArrayList<Message>> = _messages

    private val _message = MutableLiveData<ViewModelEvent<Message>>()
    val message : LiveData<ViewModelEvent<Message>> = _message

    // member
    private val _member = MutableLiveData<Member>()
    val member : LiveData<Member> = _member

    // error
    private val _error = MutableLiveData<ViewModelEvent<String>>()
    val error : LiveData<ViewModelEvent<String>> = _error

    // set functions
    fun setWorkspace(value: Workspace) {
        _workspace.value = ViewModelEvent(value)
    }
    fun setChannel(value: Channel) {
        _channel.value = ViewModelEvent(value)
    }

    fun setMessage(value: Message) {
        _message.value = ViewModelEvent(value)
    }

    fun login(email: String, password: String) {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                _member.postValue(MemberRepository().login(email, password))
            } catch (e: Exception) {
                _error.postValue(ViewModelEvent(e.message.toString()))
            }
        }
    }

    fun getWorkspaces() {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                _workspaces.postValue(WorkspaceRepository().getAll(member.value))
            } catch (e: Exception) {
                _error.postValue(ViewModelEvent(e.message.toString()))
            }
        }
    }
    fun getChannels() {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                _channels.postValue(WorkspaceRepository().getChannels(member.value, _workspace.value?.getRawContent()))
            } catch (e: Exception) {
                _error.postValue(ViewModelEvent(e.message.toString()))
            }
        }
    }

    fun getMessages() {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                val messages = ChannelRepository().getMessages(member.value, _channel.value?.getRawContent())
                val sortedMessages = messages.sortedByDescending { it.date }
                _messages.postValue(ArrayList(sortedMessages))
            } catch (e: Exception) {
                _error.postValue(ViewModelEvent(e.message.toString()))
            }
        }
    }

    fun addMessage(content: String) {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                MessageRepository().addMessage(member.value, channel.value?.getRawContent(), content)
            } catch (e: Exception) {
                _error.postValue(ViewModelEvent(e.message.toString()))
            }
        }
    }
    fun deleteMessage(message: Message) {
        viewModelScope.launch(Dispatchers.IO) {
            try {
                MessageRepository().deleteOne(member.value, message)
                _message.postValue(ViewModelEvent(message))
                getMessages()
            } catch (e: Exception) {
                _error.postValue(ViewModelEvent(e.message.toString()))
            }
        }
    }
}