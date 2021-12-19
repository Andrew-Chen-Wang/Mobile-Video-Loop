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
            VStack(spacing: 20) {
                Button("Settings") {
                    showSettingsPopover = true
                }.popover(isPresented: $showSettingsPopover) {
                    VStack {
                        Toggle("One-Click Loop", isOn: $useSimpleLoop).onChange(of: useSimpleLoop) { value in
                            UserDefaults(suiteName: UserDefaultSuiteName)!.set(value, forKey: "simple loop")
                        }
                        Text("Instead of a popup to select how long to loop, immediately loop entire duration of the video. Once enabled, to cancel the loop, press the loop button again or refresh the page.")
                    }.padding(10)
                }
                
                Divider()
                Text("You can turn on Mobile Video Loop’s Safari extension in Settings.")
                Text("To loop a video or a YouTube video, select \"Aa\" in Safari's URL bar and press on \"Tarda\"")
                Text("Video tutorial: [Press here](https://youtu.be/7yGWLK9r_Ys)")
                Text("Created by [Andrew-Chen-Wang](https://github.com/Andrew-Chen-Wang/)")
                Text("Reach out at acwangpython@gmail.com")
            }.padding(10)
        }
    }
}
