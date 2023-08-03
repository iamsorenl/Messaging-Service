import Foundation

struct MessageRepo {
    static func deleteMessage(accessToken: String, id: String) async {
        let url = URL(string: "https://cse118.com/api/v2/message/\(id)")!
        var request = URLRequest(url: url)
        request.httpMethod = "DELETE"
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        _ = try? await URLSession.shared.data(for: request)
    }
}


