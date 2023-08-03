import Foundation

struct Message: Identifiable, Codable {
    let id: String
    let member: String
    let posted: Date
    let content: String
}

extension Message {
    var formattedDate: String {
        let dateFormatterOutput = DateFormatter()
        dateFormatterOutput.dateFormat = "MMM d, yyyy 'at' h:mm a"
        return dateFormatterOutput.string(from: posted)
    }
}
