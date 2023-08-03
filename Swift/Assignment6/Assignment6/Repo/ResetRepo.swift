import Foundation

struct ResetRepo {
    static func reset(accessToken: String) async {
        let url = URL(string: "https://cse118.com/api/v2/reset")!
        var request = URLRequest(url: url)
        request.httpMethod = "PUT"
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        _ = try? await URLSession.shared.data(for: request)
    }
}


