import SwiftUI
import Foundation

/*
 * Resources:
 * Custom swipe buttons
 * https://www.youtube.com/watch?v=qSLOBpiJ2p4&ab_channel=SwiftfulThinking
 * Presentation Mode to dismiss the page, opted for this method over dismiss
 * for the need to place the action in the add button
 * https://developer.apple.com/documentation/swiftui/presentationmode
 */

struct AllMemberList: View {
    let id: String
    @EnvironmentObject var viewModel: ViewModel
    @Environment(\.presentationMode) var presentationMode
    
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
                                .swipeActions {
                                    swipeAction(memberID: member.id)
                                }
                        }
                    }
                }
            }
        }
        .onAppear {
            viewModel.getMembers()
        }
        .navigationBarTitle("Members", displayMode: .inline)
    }
    
    private func swipeAction(memberID: String) -> some View {
        Button(action: {
            addItem(memberID: memberID)
        }) {
            Image(systemName: "person.fill.badge.plus")
        }
        .accessibilityIdentifier("Add")
        .tint(.green)
    }
    
    private func addItem(memberID: String) {
        viewModel.postWorkspaceMember(workspaceID: id, memberID: memberID)
        presentationMode.wrappedValue.dismiss()
    }
}
