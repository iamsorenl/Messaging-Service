import Foundation
import SwiftUI

struct MessageCard: View {
    let message: Message
    let memberList: [Member]

    var body: some View {
        VStack(alignment: .leading) {
            let member = memberList.first(where: { $0.id == message.member })
            Text(member!.name)
            .bold()
            VStack(alignment: .leading) {
                Text("\(message.content)")
                HStack {
                    Spacer()
                    Text("\(message.formattedDate)")
                        .multilineTextAlignment(.trailing)
                        .font(.system(size: 12))
                }
            }
        }
    }
}

