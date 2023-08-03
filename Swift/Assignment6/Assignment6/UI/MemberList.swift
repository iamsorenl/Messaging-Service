import SwiftUI

struct MemberList: View {
    let id: String
    @EnvironmentObject var viewModel: ViewModel
    var body: some View {
        NavigationView {
            VStack {
                if viewModel.members.isEmpty {
                    Color(UIColor.systemGroupedBackground)
                            .ignoresSafeArea()
                } else {
                    List {
                        ForEach(viewModel.members) { member in
                            MemberCard(member: member)
                                .accessibilityIdentifier(member.name)
                        }
                        .onDelete { indices in
                            deleteItem(at: indices, viewModel: viewModel, id: id)
                        }
                    }
                }
            }
        }
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                NavigationLink(destination: AllMemberList(id: id).environmentObject(viewModel)) {
                    Image(systemName: "plus.square")
                        .imageScale(.large)
                        .foregroundColor(.blue)
                    }
                    .accessibilityIdentifier("Add Member")
                }
        }
        .onAppear {
            viewModel.getWorkspaceMember(id: id)
        }
        .navigationBarTitle("Members", displayMode: .inline)
    }
}

private func deleteItem(at indices: IndexSet, viewModel: ViewModel, id: String) {
    let memberID = viewModel.members[indices.first!].id
    viewModel.deleteWorkspaceMember(workspaceID: id, memberID: memberID)
    viewModel.members.remove(atOffsets: indices)
}
