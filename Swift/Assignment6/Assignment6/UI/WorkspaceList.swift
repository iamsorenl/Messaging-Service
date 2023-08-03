import SwiftUI

/*
 * Resources:
 * use of onDelete
 * https://developer.apple.com/documentation/swiftui/dynamicviewcontent/ondelete(perform:)/
 * disable of the delete button
 * https://developer.apple.com/documentation/charts/chart/deletedisabled(_:)/
 * To set the background color for the default screen
 * https://developer.apple.com/documentation/swiftui/color
 * Use of Tool Bar to store buttons like logout, add, reset, etc...
 * https://developer.apple.com/documentation/charts/chart/toolbar(_:for:)/
 */

struct WorkspaceList: View {
    @EnvironmentObject var viewModel: ViewModel
    var body: some View {
        NavigationView {
            VStack {
                if viewModel.workspaces.isEmpty {
                    Color(UIColor.systemGroupedBackground)
                            .ignoresSafeArea()
                } else {
                    List {
                        ForEach(viewModel.workspaces) { workspace in
                            NavigationLink(destination: ChannelList(workspace: workspace, owner: viewModel.loginResponse?.id == workspace.owner).environmentObject(viewModel)) {
                                WorkspaceCard(workspace: workspace, owner: viewModel.loginResponse?.id == workspace.owner)
                            }
                            .deleteDisabled(viewModel.loginResponse?.id != workspace.owner)
                            .accessibilityIdentifier(workspace.name)
                        }
                        .onDelete { indices in
                            deleteItem(at: indices, viewModel: viewModel)
                        }
                    }
                }
            }
        }
        .toolbar {
            ToolbarItem(placement: .navigationBarLeading) {
                Button(action: {
                    viewModel.loginResponse = nil
                }) {
                    Image(systemName: "rectangle.portrait.and.arrow.right")
                        .imageScale(.large)
                        .foregroundColor(.blue)
                }
                .accessibilityIdentifier("Logout")
            }
            ToolbarItem(placement: .navigationBarTrailing) {
                HStack {
                    Button(action: {
                            viewModel.reset()
                    }) {
                        Image(systemName: "arrow.uturn.left.circle")
                            .imageScale(.large)
                            .foregroundColor(.blue)
                    }
                    .accessibilityIdentifier("Reset")
                    
                    NavigationLink(destination: AddWorkspace().environmentObject(viewModel)) {
                        Image(systemName: "plus.square")
                            .imageScale(.large)
                            .foregroundColor(.blue)
                    }
                    .accessibilityIdentifier("New Workspace")
                }
            }
        }
        .onAppear {
            viewModel.channels.removeAll()
            viewModel.getWorkspaces()
        }
        .navigationBarTitle("Workspaces", displayMode: .inline)
    }
}

private func deleteItem(at indices: IndexSet, viewModel: ViewModel) {
    let workspaceID = viewModel.workspaces[indices.first!].id
    viewModel.deleteWorkspace(id: workspaceID)
    viewModel.workspaces.remove(atOffsets: indices)
}
