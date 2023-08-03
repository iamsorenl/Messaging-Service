import SwiftUI

struct ChannelList: View {
    let workspace: Workspace
    let owner: Bool
    @EnvironmentObject var viewModel: ViewModel
    var body: some View {
        NavigationView {
            VStack {
                if viewModel.channels.isEmpty {
                    Color(UIColor.systemGroupedBackground)
                            .ignoresSafeArea()
                } else {
                    List {
                        ForEach(viewModel.channels) { channel in
                            NavigationLink(destination: MessageList(channel: channel, owner: owner).environmentObject(viewModel)) {
                                ChannelCard(channel: channel)
                            }
                            .deleteDisabled(!owner)
                            .accessibilityIdentifier(channel.name)
                        }
                        .onDelete { indices in
                            deleteItem(at: indices, viewModel: viewModel)
                        }
                    }
                }
            }
        }
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                if owner {
                    HStack {
                        NavigationLink(destination: MemberList(id: workspace.id).environmentObject(viewModel)) {
                            Image(systemName: "person.badge.plus")
                                .imageScale(.large)
                                .foregroundColor(.blue)
                        }
                        .accessibilityIdentifier("Add Members")
                        
                        NavigationLink(destination: AddChannel(id: workspace.id).environmentObject(viewModel)) {
                            Image(systemName: "plus.square")
                                .imageScale(.large)
                                .foregroundColor(.blue)
                        }
                        .accessibilityIdentifier("New Channel")
                    }
                }
            }
        }
        .onAppear {
            viewModel.messages.removeAll()
            viewModel.getChannels(id: workspace.id)
        }
        .navigationBarTitle("\(workspace.name)", displayMode: .inline)
    }
}

private func deleteItem(at indices: IndexSet, viewModel: ViewModel) {
    let channelID = viewModel.channels[indices.first!].id
    viewModel.deleteChannel(id: channelID)
    viewModel.channels.remove(atOffsets: indices)
}
