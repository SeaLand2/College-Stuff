#include <stdio.h>
#include <stdlib.h>

#include "clear.h"
#include "playermove.h"
#include "location.h"
#include "battle.h"
#include "colour.h"
#include "casino.h"
#include "inventory.h"
#include "store.h"

int wizard = 1, troll = 1, boss = 1, magic = 0; // variables are global so they dont get reset

void playerMove(char map[8][8], int x, int y, char input)
{
    int error = 0, battle_chance;
    extern int hp, dmg, mana, game;
    char temp = map[y][x], choice[1], enter[1];
    char* enemy;

    enter[0] = 'n';
    // stops player going over walls
    if (temp == 'w')
    {
      printf("A wall blocks your path. It is too high to climb.\n");
      
      switch (input)
      {
        case 'w':
          y = y + 1;
          break;
        case 's':
          y = y - 1;
          break;
        case 'd':
          x = x - 1;
          break;
        case 'a':
          x = x + 1;
          break;
        default:
          break;
      }
    }

    // stops player going over mountains
    if (temp == 'm')
    {
      printf("A mountain blocks your path. It is too high to climb.\n");
      
      switch (input)
      {
        case 'w':
          y = y + 1;
          break;
        case 's':
          y = y - 1;
          break;
        case 'd':
          x = x - 1;
          break;
        case 'a':
          x = x + 1;
          break;
        default:
          break;
      }
    }

    // stops player going through lakes
    if (temp == 'l')
    {
      printf("A lake blocks your path. It is too deep to swim.\n");
      
      switch (input)
      {
        case 'w':
          y = y + 1;
          break;
        case 's':
          y = y - 1;
          break;
        case 'd':
          x = x - 1;
          break;
        case 'a':
          x = x + 1;
          break;
        default:
          break;
      }
    }
    
    // chance for battles
    switch(temp)
    {
      case 'y':
        battle_chance = rand() % 100;
        if ((battle_chance >= 0) && (battle_chance <= 24))
        {
          enemy = "skel";
          hp = battle(hp, dmg, mana, magic, enemy);
        }
        break;
      case 'f':
        battle_chance = rand() % 100;
        if ((battle_chance >= 0) && (battle_chance <= 4))
        {
          enemy = "wolf";
          hp = battle(hp, dmg, mana, magic, enemy);
        }
        break;
      case 'X':
        battle_chance = rand() % 100;
        if ((battle_chance >= 0) && (battle_chance <= 49))
        {
          enemy = "bats";
          hp = battle(hp, dmg, mana, magic, enemy);
        }
        break;
      case 'x':
        enemy = "band";
        hp = battle(hp, dmg, mana, magic, enemy);
        break;
      case 't':
        if (wizard == 1)
        {
          enemy = "wizd";
          hp = battle(hp, dmg, mana, magic, enemy);
          wizard = 0;
        }
        break;
      case 'B':
        if (troll == 1)
        {
          enemy = "trol";
          hp = battle(hp, dmg, mana, magic, enemy);
          troll = 0;
        }
        break;
      case 'a':
        if (boss == 1)
        {
          enemy = "boss";
          hp = battle(hp, dmg, mana, magic, enemy);
          boss = 0;
        }
        break;
      default:
        break;
    }

    switch(temp)
    {
      case 'c':
        casino();
        break;
      case 'h':
        hospital();
        y = y - 1;
        break;
      case 'b':
        blacksmith();
        y = y - 1;
        break;
      case 'G':
        general();
        y = y - 1;
        break;
      case 'C':
        castle();
        break;
      default:
        break;
    }

    if (hp > 0)
    {
      temp = map[y][x];
  
      char* area = location(temp);

      printf("Your HP is at ");
      green();
      printf("%d\n\n", hp);
      reset();

      printf("You are currently at location: %s\n", area);
      printf("What would you like to do?\n");
      printf("Move (W, A, S, D), Inventory (I), Clear Screen (C): ");
      scanf(" %c", &choice[0]);
      
      switch (choice[0])
      {
        case 'w':
          y = y - 1;
          break;
        case 's':
          y = y + 1;
          break;
        case 'd':
          x = x + 1;
          break;
        case 'a':
          x = x - 1;
          break;
        case '\n':
          break;
        case 'i':
          break;
        case 'c':
          break;
        default:
          error = 1;
          break;
      }

      if (x < 0 || y < 0 || x >(8 - 1) || y >(8 - 1))
      {
          x = (x > (8 - 1)) ? (8 - 1) : x;
          x = (x < 0) ? 0 : x;
          y = (y > (8 - 1)) ? (8 - 1) : y;
          y = (y < 0) ? 0 : y;
          error = 1;
      }

      if ((choice[0] == 'i') || (choice[0] == 'I'))
      {
        printf("\n");
        inv_see();
      }

      if ((choice[0] == 'c') || (choice[0] == 'C'))
      {
        clrscr();
      }
      else
      {
        printf("\n\n");
        yellow();
        for (int i=0; i<60; i++)
        {
          printf("-");
        }
        reset();
        printf("\n\n");
      }

      while (getchar() != '\n');

      if (error == 1)
          printf("YOU CAN'T GO THAT WAY!\n");
      if (game == 1)
        playerMove(map, x, y, choice[0]);
    }
}