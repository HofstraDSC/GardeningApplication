import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(
  home: Home(),
));

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('DSC Gardening'),
        centerTitle: true,
        backgroundColor: Colors.green[900],
        elevation: 0.0,
      ),
      body: Padding(
        padding: EdgeInsets.fromLTRB(30.0, 40.0, 30.0, 0.0),
        child: Column(
          children: <Widget> [
            Center(
              child: Container(
                margin: EdgeInsets.all(20.0),
                padding: EdgeInsets.all(10.0),
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(100),
                  border: Border.all(width: 2, color: Colors.brown[700]),
                ),
                child: Icon(
                  Icons.local_florist,
                  color: Colors.green[800],
                  size: 100.0,
                ),
              ),
            ),
            Row(
              children: <Widget> [
                Text(
                    'Login:',
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                    )
                ),
              ]
            ),
            SizedBox(width: 10.0),
            TextField(
              decoration: InputDecoration(
                border: InputBorder.none,
                hintText: 'Enter',
              ),
            ),
            Row(
              children: <Widget>[
                SizedBox(width:60.0),
                RaisedButton.icon(
                  onPressed: () {},
                  icon: Icon(Icons.play_for_work),
                  label: Text('Login'),
                  color: Colors.green,
                ),
                SizedBox(width: 30.0),
                RaisedButton.icon(
                  onPressed: () {},
                  icon: Icon(Icons.person_add),
                  label: Text('Register'),
                  color: Colors.green,
                ),
              ],
            ),
          ]
        )
      ),
    );
  }
}