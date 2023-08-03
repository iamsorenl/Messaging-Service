import Foundation
import SwiftUI

struct WorkspaceCard: View {
    let workspace: Workspace
    let owner: Bool
    var body: some View {
        VStack(alignment: .leading) {
            HStack {
                Group {
                    if owner {
                        Image(systemName: "person.2.badge.gearshape")
                            .foregroundColor(.blue)
                    } else {
                        Image(systemName: "person.2")
                            .foregroundColor(.blue)
                    }
                }
                .imageScale(.large)
                Text(workspace.name)
                Spacer()
                Text("\(workspace.channels)")
            }
        }
    }
}
