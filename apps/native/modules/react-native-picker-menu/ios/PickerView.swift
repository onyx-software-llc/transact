//
//  Picker.swift
//  Pods
//
//  Created by Josiah Roa on 11/18/24.
//
import SwiftUI

class PickerViewModel: ObservableObject {
    @Published var selected = ""
    @Published var options: [String] = []
}

struct PickerView: View {
    @StateObject var viewModel: PickerViewModel
    
    var body: some View {
        VStack {
            Picker("Theme", selection: $viewModel.selected) {
                ForEach(viewModel.options, id: \.self) { option in
                    Text(option)
                }
            }
            .pickerStyle(.menu)
        }
    }
}
