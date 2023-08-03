import Foundation

struct WorkspaceRepo {
    static func getWorkspaces(accessToken: String) async throws -> [Workspace] {
        let url = URL(string: "https://cse118.com/api/v2/workspace")!
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder().decode([Workspace].self, from: data)
    }
    
    static func getWorkspaceChannels(accessToken: String, id: String) async throws -> [Channel] {
        let url = URL(string: "https://cse118.com/api/v2/workspace/\(id)/channel")!
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder().decode([Channel].self, from: data)
    }
    
    static func postWorkspace(accessToken: String, name: String) async throws -> Workspace {
        let url = URL(string: "https://cse118.com/api/v2/workspace")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        let parameters: [String: Any] = ["name": name]
        request.httpBody = try JSONSerialization.data(withJSONObject: parameters, options: [])
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder().decode(Workspace.self, from: data)
    }
    
    static func deleteWorkspace(accessToken: String, id: String) async {
        let url = URL(string: "https://cse118.com/api/v2/workspace/\(id)")!
        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        _ = try? await URLSession.shared.data(for: request)
    }
    
    static func postWorkspaceChannel(accessToken: String, id: String, name: String) async throws -> Channel {
        let url = URL(string: "https://cse118.com/api/v2/workspace/\(id)/channel")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        let parameters: [String: Any] = ["name": name]
        request.httpBody = try JSONSerialization.data(withJSONObject: parameters, options: [])
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder().decode(Channel.self, from: data)
    }
    
    static func getWorkspaceMembers(accessToken: String, id: String) async throws -> [Member] {
        let url = URL(string: "https://cse118.com/api/v2/workspace/\(id)/member")!
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder().decode([Member].self, from: data)
    }
    
    static func postWorkspaceMember(accessToken: String, workspaceID: String, memberID: String) async {
        let url = URL(string: "https://cse118.com/api/v2/workspace/\(workspaceID)/member?mid=\(memberID)")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        _ = try? await URLSession.shared.data(for: request)
    }
    
    static func deleteWorkspaceMember(accessToken: String, workspaceID: String, memberID: String) async {
        let url = URL(string: "https://cse118.com/api/v2/workspace/\(workspaceID)/member?mid=\(memberID)")!
        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        _ = try? await URLSession.shared.data(for: request)
    }
    
    
}


