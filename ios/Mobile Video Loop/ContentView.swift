//
//  ContentView.swift
//  Mobile Video Loop
//
//  Created by Andrew C Wang on 11/20/21.
//

import SwiftUI

struct ContentView: View {
    // MARK - Configurations
    @State private var showSettingsPopover = false

    // False by default, even if key DNE
    @State private var useSimpleLoop = UserDefaults(suiteName: UserDefaultSuiteName)!.bool(forKey: "simple loop")

    var body: some View {
        ScrollView {
            Button("Settings") {
                showSettingsPopover = true
            }.popover(isPresented: $showSettingsPopover) {
                Toggle("One-Click Loop", isOn: $useSimpleLoop).onChange(of: useSimpleLoop) { value in
                    UserDefaults(suiteName: UserDefaultSuiteName)!.set(value, forKey: "simple loop")
                }
                Text("Instead of a popup to select how long to loop, simply Loopify entire duration of the video. To cancel, press the loopify button again or refresh the page.")
            }
            
            Divider()
            Text("You can turn on Mobile Video Loop’s Safari extension in Settings.")
            Text("To loop a video or a YouTube video, select \"Aa\" in Safari and press on \"Loop Video\"")
            Text("Created by [Andrew-Chen-Wang](https://github.com/Andrew-Chen-Wang/)")
        }
    }
}
