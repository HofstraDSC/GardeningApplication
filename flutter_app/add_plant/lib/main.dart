import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:async';

Future<Plants> fetchPlants() async {
  final response = await http.get('http://35.236.238.30:3000/plant/all');
  if(response.statusCode == 200) {
    print(Plants.fromJson(json.decode(response.body)));
    return Plants.fromJson(json.decode(response.body));
  } else {
    print(response.statusCode);
    throw Exception('Failed to load album');
  }
}

class Plants {
  final String name;
  final String type;
  Plants({this.name, this.type});
  factory Plants.fromJson(Map<String, dynamic> json) {
    return Plants(
      name: json['plants']['PlantName'],
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
  Future<Plants> futurePlants;

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
              child: FutureBuilder<Plants>(
                future: futurePlants,
                builder: (context, snapshot) {
                  if (snapshot.hasData) {
                    return Text(snapshot.data.name);
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