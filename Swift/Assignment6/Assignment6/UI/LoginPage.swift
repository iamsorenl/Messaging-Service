import SwiftUI

struct LoginPage: View {
    @State var email: String = ""
    @State var password: String = ""
    @EnvironmentObject var viewModel: ViewModel
    var body: some View {
        VStack {
            Image("SlugLogo")
                .resizable()
                .frame(width: 200, height: 200)
            TextField("EMail", text: $email)
                .autocapitalization(.none)
                .textFieldStyle(.roundedBorder)
                .frame(width: 250)
            SecureField("Password", text: $password)
                .autocapitalization(.none)
                .textFieldStyle(.roundedBorder)
                .frame(width: 250)
            Button(action: {
                let credentials = LoginCredentials(email: email, password: password)
                viewModel.login(credentials: credentials)
            }) {
                Text("Login")
                    .foregroundColor(.blue)
            }
            Spacer()
        }
        .padding()
        .navigationTitle("")
    }
}
