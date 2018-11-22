#include <iostream>
#include <string>
#include <algorithm>
#include <fstream>

using namespace std;

char str[100001];
long long querys[100000];
char * pos[100000];
long start[100000];



bool compare (char* a , char* b) {
    if (*a > *b){
        return true;
    } else if (*a == *b) {
        return compare(a+1 , b+1);
    } else {
        return false;
    }
}

void heapify (long n , long p) {

    long largest = p;
    long l = p*2 + 1;
    long r = p*2 + 2;

    if (l < n && compare(pos[l],pos[largest])) {
        largest = l;
    }

    if (r < n && compare(pos[r],pos[largest])) {
        largest = r;
    }

    if (largest != p) {
        swap(pos[p] , pos[largest]);
        return heapify(n , largest);
    }
    return;
}




int main() {

    long n,q;
    long length = 0;
    long long cq[2] = {0};//count query


    ifstream mstr;
    mstr.open("query.txt" , ios::in);

    mstr >> n;
    mstr >> q;

    for(long i = 0 ; i < n ; i++) {
        mstr >> str[i];
    }

    long i=0;

    while(mstr >> querys[i++]){}

    mstr.close();

    sort(querys , querys + q);

    pos[0] = &str[0];

    for (long i = 1 ; i < n ; i++) {

        pos[i] = pos[0] + i;

    }

    if(n%2 == 0){
        for (long i = n/2 - 1 ; i >= 0 ; i--){
            heapify(n , i);
        }
    } else {
        for (long i = (n - 1)/2 ; i >= 0 ; i--){
            heapify(n , i);
        }
    }

    cout << "a/n";

    for(long i = n-1 ; i > 0 ; i--){
        swap(pos[0] , pos[i]);
        heapify(i , 0);
    }

    cout << "b/n";
    start[0] = 1;

    for (long i = 1 ; i < n ; i++) {

        while(*(pos[i - 1] + start[i]) == *(pos[i] + start[i]++)){};

    }

    cout << "c/n";
    for (long i = 0 ; i < n ; i++) {
        while ( &str[0] + n - pos[i] - start[i] + 1  > querys[cq[1]] - cq[0]) {//&str[0] + n - pos[i] - start[i] + 1 is the number of unique substiong from that startpoint
            int out = 0;
            for ( char c = 97 ; c < 123 ; c++) {
                for ( long j = 0 ; j < start[i] + querys[cq[1]] - cq[0] ; j++ ) {

                    if ( c == *(pos[i] +j)) {
                        out ++;
                        break;
                    }
                }
            }

            cout << out << endl;
            if(++cq[1] == q){
                goto end;
            }
        }

        cq[0] += &str[0] + n - pos[i] - start[i] + 1;

        //part for writing out substings in order
/*
        for (char *k = pos[i] + start[i] ; k <= &str[0] + n ; k++ ){
            for( char*j = pos[i] ; j < k  ; j++) {
                cout << *j;
            }
            cout << endl;
        }
*/
    }
    cout << cq[0] << endl;
    end:
    while(++cq[1] <= q){
        cout << -1 << endl;
    }

    return 0;
}