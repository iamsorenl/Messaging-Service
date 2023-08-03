package edu.ucsc.cse118.assignment3.ui.workspace

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import edu.ucsc.cse118.assignment3.R
import edu.ucsc.cse118.assignment3.data.Workspace

class WorkspaceAdapter(private val workspaces: ArrayList<Workspace>, private val listener: WorkspaceListener) :
    RecyclerView.Adapter<WorkspaceAdapter.WorkspaceViewHolder>()
{
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): WorkspaceViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.card_view_workspace, parent, false)
        return WorkspaceViewHolder(view)
    }

    override fun onBindViewHolder(holder: WorkspaceViewHolder, position: Int) {
        holder.bind(workspaces[position])
        holder.itemView.setOnClickListener { listener.onClick(workspaces[position]) }
    }

    override fun getItemCount(): Int {
        return workspaces.size
    }

    class WorkspaceViewHolder(ItemView: View) : RecyclerView.ViewHolder(ItemView) {
        private val titleWorkspace: TextView = itemView.findViewById(R.id.title_workspace)
        private val numChannels : TextView = itemView.findViewById(R.id.num_channels)
        fun bind(workspace: Workspace) {
            titleWorkspace.text = workspace.name
            numChannels.text = "${workspace.channels} Channels"
        }
    }
    }