import Foundation

/*
 * Resources:
 * To create a Post Request:
 * https://www.appsdeveloperblog.com/http-post-request-example-in-swift/
 */

struct LoginRepo {
    static func login(credentials: LoginCredentials) async throws -> LoginResponse {
        var request = URLRequest(url: URL(string: "https://cse118.com/api/v2/login")!)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        let jsonData = try? JSONEncoder().encode(credentials)
        request.httpBody = jsonData
        let (data, _) = try await URLSession.shared.data(for: request)
        return try JSONDecoder().decode(LoginResponse.self, from: data)
    }
}
