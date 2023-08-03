import Foundation

struct Channel: Identifiable, Codable, Equatable {
    let id: String
    let name: String
    let messages: Int
}
