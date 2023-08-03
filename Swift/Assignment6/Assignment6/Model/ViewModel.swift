import Foundation

class ViewModel: ObservableObject {
    @Published var credentials: LoginCredentials?
    @Published var loginResponse: LoginResponse?
    @Published var workspaces = [Workspace]()
    @Published var workspace: Workspace?
    @Published var channels = [Channel]()
    @Published var channel: Channel?
    @Published var messages = [Message]()
    @Published var message: Message?
    @Published var members = [Member]()
    @Published var member: Member?
    
    func login(credentials: LoginCredentials) {
        Task {
            if let response = try? await LoginRepo.login(credentials: credentials) {
                DispatchQueue.main.async {
                    self.loginResponse = response
                }
            }
        }
    }
    
    func getWorkspaces() {
        Task {
            if let response = try? await WorkspaceRepo.getWorkspaces(accessToken: loginResponse!.accessToken) {
                DispatchQueue.main.async {
                    self.workspaces = response
                }
            }
        }
    }
    
    // returns the workspace that was added when successful
    func postWorkspace(name: String) {
        Task {
            if let response = try? await WorkspaceRepo.postWorkspace(accessToken: loginResponse!.accessToken, name: name) {
                DispatchQueue.main.async {
                    self.workspace = response
                }
            }
        }
    }
    
    func deleteWorkspace(id: String) {
        Task {
            await WorkspaceRepo.deleteWorkspace(accessToken: loginResponse!.accessToken, id: id)
        }
    }

    func getChannels(id: String) {
        Task {
            if let response = try? await WorkspaceRepo.getWorkspaceChannels(accessToken: loginResponse!.accessToken, id: id) {
                DispatchQueue.main.async {
                    self.channels = response
                }
            }
        }
    }
    
    func deleteChannel(id: String) {
        Task {
            await ChannelRepo.deleteChannel(accessToken: loginResponse!.accessToken, id: id)
        }
    }
    
    func postWorkspaceChannel(id: String, name: String) {
        Task {
            if let response = try? await WorkspaceRepo.postWorkspaceChannel(accessToken: loginResponse!.accessToken, id: id, name: name) {
                DispatchQueue.main.async {
                    self.channel = response
                }
            }
        }
    }
    
    func getWorkspaceMember(id: String) {
        Task {
            if let response = try? await WorkspaceRepo.getWorkspaceMembers(accessToken: loginResponse!.accessToken, id: id) {
                DispatchQueue.main.async {
                    self.members = response
                }
            }
        }
    }
    
    func postWorkspaceMember(workspaceID: String, memberID: String) {
        Task {
            await WorkspaceRepo.postWorkspaceMember(accessToken: loginResponse!.accessToken, workspaceID: workspaceID, memberID: memberID)
        }
    }
    
    func deleteWorkspaceMember(workspaceID: String, memberID: String) {
        Task {
            await WorkspaceRepo.deleteWorkspaceMember(accessToken: loginResponse!.accessToken, workspaceID: workspaceID, memberID: memberID)
        }
    }
    
    func getMessages(id: String) {
        Task {
            if let response = try? await ChannelRepo.getChannelMessages(accessToken: loginResponse!.accessToken, id: id) {
                DispatchQueue.main.async {
                    self.messages = response
                }
            }
        }
    }
    
    // returns the message that was added when successful
    func postMessage(id: String, content: String) {
        Task {
            if let response = try? await ChannelRepo.postChannelMessage(accessToken: loginResponse!.accessToken, id: id, content: content) {
                DispatchQueue.main.async {
                    self.message = response
                }
            }
        }
    }
    
    func getMembers() {
        Task {
            if let response = try? await MemberRepo.getMembers(accessToken: loginResponse!.accessToken) {
                DispatchQueue.main.async {
                    self.members = response
                }
            }
        }
    }
    
    func deleteMessage(id: String) {
        Task {
            await MessageRepo.deleteMessage(accessToken: loginResponse!.accessToken, id: id)
        }
    }
    
    func reset() {
        Task {
            await ResetRepo.reset(accessToken: loginResponse!.accessToken)
            Task.detached {
                if let response = try? await WorkspaceRepo.getWorkspaces(accessToken: self.loginResponse!.accessToken) {
                    DispatchQueue.main.async {
                        self.workspaces = response
                    }
                }
            }
        }
    }
}
