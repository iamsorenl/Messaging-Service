import Foundation
import SwiftUI

struct ChannelCard: View {
    let channel: Channel
    var body: some View {
        VStack(alignment: .leading) {
            HStack {
                Text(channel.name)
                Spacer()
                Text("\(channel.messages)")
            }
        }
    }
}
