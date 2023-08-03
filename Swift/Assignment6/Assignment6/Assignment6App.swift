import SwiftUI

@main
struct Assignment6App: App {
    @StateObject private var viewModel = ViewModel()
    var body: some Scene {
        WindowGroup {
            NavigationStack {
                if viewModel.loginResponse != nil {
                    WorkspaceList()
                        .environmentObject(viewModel)
                } else {
                    LoginPage()
                        .environmentObject(viewModel)
                }
            }
        }
    }
}
