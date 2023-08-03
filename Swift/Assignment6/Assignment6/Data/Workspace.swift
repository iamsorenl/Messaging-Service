import Foundation

struct Workspace: Identifiable, Codable, Equatable {
    let id: String
    let name: String
    let owner: String
    let channels: Int
}
