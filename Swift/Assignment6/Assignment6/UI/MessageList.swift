import SwiftUI

struct MessageList: View {
    let channel: Channel
    let owner: Bool
    @EnvironmentObject var viewModel: ViewModel
    var body: some View {
        NavigationView {
            VStack {
                if viewModel.messages.isEmpty {
                    Color(UIColor.systemGroupedBackground)
                            .ignoresSafeArea()
                } else {
                    List {
                        ForEach(viewModel.messages) { message in
                            MessageCard(message: message, memberList: viewModel.members)
                                .deleteDisabled(!(owner || viewModel.loginResponse!.id == message.member))
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
                NavigationLink(destination: AddMessage(id: channel.id).environmentObject(viewModel)) {
                    Image(systemName: "plus.square")
                        .imageScale(.large)
                        .foregroundColor(.blue)
                }
                .accessibilityIdentifier("New Message")
            }
        }
        .onAppear {
            viewModel.messages.removeAll()
            viewModel.getMessages(id: channel.id)
            viewModel.getMembers()
        }
        .navigationBarTitle("\(channel.name)", displayMode: .inline)
    }
}

private func deleteItem(at indices: IndexSet, viewModel: ViewModel) {
    let messageID = viewModel.messages[indices.first!].id
    viewModel.deleteMessage(id: messageID)
    viewModel.messages.remove(atOffsets: indices)
}

