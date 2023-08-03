import Foundation
import SwiftUI

struct MemberCard: View {
    let member: Member
    var body: some View {
        VStack(alignment: .leading) {
            Text(member.name)
        }
    }
}
