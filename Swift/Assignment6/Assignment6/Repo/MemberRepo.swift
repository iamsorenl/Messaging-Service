import Foundation

struct MemberRepo {
    static func getMembers(accessToken: String) async throws -> [Member] {
        let url = URL(string: "https://cse118.com/api/v2/member")!
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        request.setValue("Bearer \(accessToken)", forHTTPHeaderField: "Authorization")
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder().decode([Member].self, from: data)
    }
}


