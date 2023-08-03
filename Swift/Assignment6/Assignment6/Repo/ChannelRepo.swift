import Foundation

struct ChannelRepo {
    static func getChannelMessages(accessToken: String, id: String) async throws -> [Message] {
        let url = URL(string: "https://cse118.com/api/v2/channel/\(id)/message")!
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder.javaScriptISO8601().decode([Message].self, from: data)
    }
    
    static func postChannelMessage(accessToken: String, id: String, content: String) async throws -> Message {
        let url = URL(string: "https://cse118.com/api/v2/channel/\(id)/message")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        let parameters: [String: Any] = ["content": content]
        request.httpBody = try JSONSerialization.data(withJSONObject: parameters, options: [])
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder.javaScriptISO8601().decode(Message.self, from: data)
    }
    
    static func deleteChannel(accessToken: String, id: String) async {
        let url = URL(string: "https://cse118.com/api/v2/channel/\(id)")!
        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        _ = try? await URLSession.shared.data(for: request)
    }
}


