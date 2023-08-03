import Foundation

struct LoginResponse: Identifiable, Codable, Equatable {
    let id: String
    let name: String
    let accessToken: String
}
