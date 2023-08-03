import Foundation
import SwiftUI

/*
 * Resources:
 * Use of dismiss to go to previous page
 * https://developer.apple.com/documentation/swiftui/environmentvalues/dismiss
 */

struct AddChannel: View {
    @EnvironmentObject var viewModel: ViewModel
    @State private var name: String = ""
    @Environment(\.dismiss) var dismiss
    let id: String
    var body: some View {
        VStack(alignment: .leading) {
            TextField("Name", text: $name)
                .textFieldStyle(.roundedBorder)
                .padding(.horizontal, 20)
            HStack(alignment: .center) {
                Spacer()
                Button("Cancel") {
                    dismiss()
                }
                .padding(.horizontal, 20)
                Button("OK") {
                    viewModel.postWorkspaceChannel(id: id, name: name)
                    viewModel.getChannels(id: id)
                    dismiss()
                }
                .disabled(name.count < 4 || name.count > 32)
                .padding(.horizontal, 20)
                Spacer()
            }
            .padding(.vertical, 20)
            .padding(.horizontal, 20)
            Spacer()
        }
        .navigationBarTitle("New Channel", displayMode: .inline)
    }
}
