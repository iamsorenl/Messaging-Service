import Foundation
import SwiftUI

/*
 * Resources:
 * Use of dismiss to go to previous page
 * https://developer.apple.com/documentation/swiftui/environmentvalues/dismiss
 * Rounded Rectangle around text editor to add an outline
 * https://developer.apple.com/documentation/swiftui/roundedrectangle/
 */

struct AddMessage: View {
    let id: String
    @EnvironmentObject var viewModel: ViewModel
    @State private var content: String = ""
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        VStack(alignment: .leading) {
            TextEditor(text: $content)
                .padding(.horizontal, 20)
                .frame(height: 200)
                .accessibilityIdentifier("Message")
                .overlay(
                    RoundedRectangle(cornerRadius: 5)
                        .stroke(Color.gray, lineWidth: 1)
                        .padding(.horizontal, 20)
                )
                .overlay(
                    Text("Message")
                        .foregroundColor(.gray)
                        .opacity(content.isEmpty ? 0.5 : 0)
                )
                    .padding(.horizontal, 20)
                    .padding(.top, 20)
                    .frame(height: 200)
            HStack(alignment: .center) {
                Spacer()
                Button("Cancel") {
                    dismiss()
                }
                .padding(.horizontal, 20)
                Button("OK") {
                    viewModel.postMessage(id: id, content: content)
                    viewModel.getMessages(id: id)
                    dismiss()
                }
                .disabled(content.count < 4)
                .padding(.horizontal, 20)
                Spacer()
            }
            .padding(.vertical, 20)
            .padding(.horizontal, 20)
            Spacer()
        }
        .navigationBarTitle("New Message", displayMode: .inline)
    }
}
