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
    print('Error');
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
      type: json['plants']['PlantType'],
    );
  }
}

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Add Plant',
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      home: MyHomePage(title: 'Choose a plant to add to your garden!'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;
  @override
  _MyHomePageState createState() => _MyHomePageState();
}


class _MyHomePageState extends State<MyHomePage> {
  Future<Plants> futurePlants;
  @override
  void initState() {
    super.initState();
    futurePlants = fetchPlants();
  }

  void pushFruit() {
    Navigator.of(context).push(
        MaterialPageRoute<void>(
            builder: (BuildContext context) {
              return Scaffold(
                appBar: AppBar(
                  title: Text('Fruit Page'),
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
              );
            }
            )
          );
  }

  void pushVegetable() {
    Navigator.of(context).push(
        MaterialPageRoute<void>(
            builder: (BuildContext context) {
              return Scaffold(
                  appBar: AppBar(
                    title: Text('Vegetable Page'),
                  ),
                  body: Center(
                      child: Text('This is the vegetable page')
                  )
              );
            }
        )
    );
  }

  void pushFlower() {
    Navigator.of(context).push(
        MaterialPageRoute<void>(
            builder: (BuildContext context) {
              return Scaffold(
                  appBar: AppBar(
                    title: Text('Flower Page'),
                  ),
                  body: Center(
                      child: Text('This is the flower page')
                  )
              );
            }
        )
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            RaisedButton(
              child: Text('Add fruit'),
              onPressed: pushFruit,
            ),
            RaisedButton(
              child: Text('Add vegetable'),
              onPressed: pushVegetable,
            ),
            RaisedButton(
              child: Text('Add flower'),
              onPressed: pushFlower,
            )
          ],
        ),
      ),
    );
  }
}
