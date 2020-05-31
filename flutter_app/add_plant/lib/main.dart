import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:async';

Future<List<Plant>> fetchPlants() async {
  final response = await http.get('http://35.236.238.30:3000/plant/all');
  if(response.statusCode == 200) {
    List responseJson = json.decode(response.body);
    return responseJson.map((m) => new Plant.fromJson(m)).toList();
  } else {
    print(response.statusCode);
    throw Exception('Failed to load album');
  }
}

class Plant{
  final String name;
  Plant({this.name});
  factory Plant.fromJson(Map<String, dynamic> json) {
    return Plant(
      name: json['PlantName'],
    );
  }
}

class Plants {
  final List<Plant> plants;
  Plants({this.plants});
  factory Plants.fromJson(Map<String, dynamic> json) {
    var list = json['plants'] as List;
    print(list.runtimeType);
    List<Plant> plantsList = list.map((i) => Plant.fromJson(i)).toList();
    return Plants(
      plants: plantsList,
    );
  }
}

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  MyApp({Key key}) : super(key: key);

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  Future<List<Plant>> futurePlants;

  @override
  void initState() {
    super.initState();
    futurePlants = fetchPlants();
  }
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Add Plant',
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      home: Scaffold(
          appBar: AppBar(
            title: Text('Choose a plant to add to your garden!'),
          ),
          body: Center(
              child: FutureBuilder<List<Plant>>(
                future: futurePlants,
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    List<Plant> theplants = snapshot.data;
                    return new ListView(
                      children: theplants.map((plant) => Text(plant.name)).toList(),
                    );
                  } else if (snapshot.hasError) {
                    print("${snapshot.error}");
                    return Text("${snapshot.error}");
                  }
                  return CircularProgressIndicator();
                },
              )
          )
      ),
    );
  }
}